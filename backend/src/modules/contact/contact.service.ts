import { Prisma } from '@prisma/client';
import { prisma } from '../../config/db';
import { emailService } from '../../services/email.service';
import { config } from '../../config/env';
import { logger } from '../../utils/logger';

export class ContactService {
  static async create(data: {
    name: string;
    email: string;
    phone?: string;
    village?: string;
    district?: string;
    state?: string;
    roles?: string[];
    interests?: string[];
    products?: string[];
    message: string;
  }) {
    // Build a location prefix so village/district/state aren't lost until migration runs
    const locationLine = [data.village, data.district, data.state].filter(Boolean).join(', ');
    const productLine = (data.products ?? []).length
      ? `Products: ${(data.products ?? []).join(', ')}`
      : '';
    const messageWithMeta = [locationLine, productLine, data.message]
      .filter(Boolean)
      .join('\n');

    const record = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        // store multi-select arrays as comma-separated strings in existing columns
        role: (data.roles ?? []).join(', ') || undefined,
        interest: (data.interests ?? []).join(', ') || undefined,
        message: messageWithMeta,
      },
    });

    // Send notification email to admin
    const adminEmail = config.adminEmailTo;
    if (adminEmail) {
      const row = (label: string, value: string) =>
        value
          ? `<tr>
               <td style="padding:10px 16px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;white-space:nowrap;vertical-align:top;border-bottom:1px solid #f3f4f6;">${label}</td>
               <td style="padding:10px 16px;font-size:14px;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;">${value}</td>
             </tr>`
          : '';

      const html = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"/></head>
        <body style="margin:0;padding:0;background:#f9fafb;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">

                <!-- Header -->
                <tr>
                  <td style="background:#4a703f;padding:32px 40px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.15em;color:rgba(255,255,255,0.6);">Gauyog Kendr</p>
                    <h1 style="margin:0;font-size:24px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">New Enquiry Received</h1>
                    <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.7);">${new Date(record.createdAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</p>
                  </td>
                </tr>

                <!-- Fields -->
                <tr>
                  <td style="padding:8px 24px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${row('Full Name', data.name)}
                      ${row('Email', data.email)}
                      ${row('Phone', data.phone || '')}
                      ${row('Village / City', data.village || '')}
                      ${row('District', data.district || '')}
                      ${row('State', data.state || '')}
                      ${row('You Are A', (data.roles ?? []).join(', '))}
                      ${row('Area of Interest', (data.interests ?? []).join(', '))}
                      ${row('Product Interest', (data.products ?? []).join(', '))}
                    </table>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding:0 40px 32px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;color:#6b7280;">Message / Requirement</p>
                    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px 20px;font-size:14px;font-weight:600;color:#374151;line-height:1.7;white-space:pre-wrap;">${data.message}</div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 40px;text-align:center;">
                    <p style="margin:0;font-size:11px;color:#9ca3af;">View in admin dashboard → <a href="${config.appBaseUrl}/admin" style="color:#4a703f;font-weight:700;">gauyogkendr.com/admin</a></p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `;

      emailService.sendMail({
        to: adminEmail,
        subject: `New Enquiry from ${data.name}${data.roles?.length ? ` (${data.roles[0]})` : ''}`,
        html,
        text: [
          `New enquiry from the Gauyog Kendr website`,
          ``,
          `Name:           ${data.name}`,
          `Email:          ${data.email}`,
          `Phone:          ${data.phone || '—'}`,
          `Village / City: ${data.village || '—'}`,
          `District:       ${data.district || '—'}`,
          `You Are A:      ${(data.roles ?? []).join(', ') || '—'}`,
          `Area of Interest: ${(data.interests ?? []).join(', ') || '—'}`,
          `Products:       ${(data.products ?? []).join(', ') || '—'}`,
          ``,
          `Message:`,
          data.message,
        ].join('\n'),
      }).catch((err) => logger.error('Failed to send contact email to admin', err));
    }

    return record;
  }

  static async list(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;
    const where: Prisma.ContactMessageWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { message: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contactMessage.count({ where }),
    ]);

    return {
      messages,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
