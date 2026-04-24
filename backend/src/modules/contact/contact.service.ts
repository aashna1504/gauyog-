import { Prisma } from '@prisma/client';
import { prisma } from '../../config/db';
import { emailService } from '../../services/email.service';
import { logger } from '../../utils/logger';

export interface ContactInput {
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
}

// ─── Build the admin notification email with every field the user submitted ───

function buildAdminEmail(data: ContactInput, submittedAt: Date): string {
  const location = [data.village, data.district, data.state].filter(Boolean).join(', ');
  const roles     = (data.roles     ?? []).filter(Boolean);
  const interests = (data.interests ?? []).filter(Boolean);
  const products  = (data.products  ?? []).filter(Boolean);

  const chip = (text: string, bg = '#f0f7ee', color = '#4a703f', border = '#c6dcc2') =>
    `<span style="display:inline-block;background:${bg};color:${color};border:1px solid ${border};
      border-radius:999px;padding:4px 14px;font-size:12px;font-weight:700;margin:3px 4px 3px 0;
      font-family:Helvetica,Arial,sans-serif;">${text}</span>`;

  const row = (label: string, value: string) =>
    value.trim()
      ? `<tr>
           <td style="padding:9px 16px 9px 0;font-size:11px;font-weight:800;text-transform:uppercase;
             letter-spacing:.08em;color:#9ca3af;white-space:nowrap;vertical-align:top;width:120px;">
             ${label}
           </td>
           <td style="padding:9px 0;font-size:14px;font-weight:600;color:#111827;
             border-bottom:1px solid #f3f4f6;">
             ${value}
           </td>
         </tr>`
      : '';

  const section = (title: string, body: string) =>
    `<tr><td style="padding:20px 0 0;">
       <p style="margin:0 0 8px;font-size:10px;font-weight:800;text-transform:uppercase;
         letter-spacing:.12em;color:#9ca3af;">${title}</p>
       ${body}
       <div style="height:1px;background:#f3f4f6;margin-top:18px;"></div>
     </td></tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0"
       style="background:#f1f5f9;padding:36px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0"
       style="background:#fff;border-radius:20px;overflow:hidden;
              box-shadow:0 4px 32px rgba(0,0,0,.08);">

  <!-- ── HEADER ── -->
  <tr>
    <td style="background:#4a703f;padding:32px 36px;">
      <p style="margin:0 0 4px;font-size:10px;font-weight:800;text-transform:uppercase;
        letter-spacing:.2em;color:rgba(255,255,255,.5);">GAUYOG KENDR · ENQUIRY FORM</p>
      <h1 style="margin:0 0 8px;font-size:24px;font-weight:900;color:#fff;letter-spacing:-.02em;">
        📋 New Enquiry Received
      </h1>
      <p style="margin:0;font-size:12px;color:rgba(255,255,255,.65);">
        ${submittedAt.toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}
      </p>
    </td>
  </tr>

  <!-- ── BODY ── -->
  <tr><td style="padding:28px 36px 8px;">
  <table width="100%" cellpadding="0" cellspacing="0">

    <!-- Section 1: Basic Details -->
    ${section('Basic Details',
      `<table cellpadding="0" cellspacing="0" width="100%">
        ${row('Full Name',   data.name)}
        ${row('Mobile',      data.phone  || '')}
        ${row('Email',       data.email)}
        ${row('Village/City',data.village || '')}
        ${row('District',    data.district|| '')}
        ${row('State',       data.state   || '')}
      </table>`
    )}

    <!-- Section 2: You Are A -->
    ${roles.length ? section('You Are A',
      `<div>${roles.map(r => chip(r)).join('')}</div>`
    ) : ''}

    <!-- Section 3: Area of Interest -->
    ${interests.length ? section('Area of Interest',
      `<div>${interests.map(i => chip(i, '#fff7ed', '#c2410c', '#fed7aa')).join('')}</div>`
    ) : ''}

    <!-- Section 4: Product Interest -->
    ${products.length ? section('Product Interest',
      `<div>${products.map(p => chip(p, '#f0fdf4', '#15803d', '#bbf7d0')).join('')}</div>`
    ) : ''}

    <!-- Section 5: Message -->
    ${section('Message / Requirement',
      `<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;
           padding:16px 20px;font-size:14px;font-weight:500;color:#374151;
           line-height:1.8;white-space:pre-wrap;">${data.message || '—'}</div>`
    )}

  </table>
  </td></tr>

  <!-- ── REPLY CTA ── -->
  <tr>
    <td style="padding:20px 36px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-size:13px;color:#6b7280;">
            Reply to: <a href="mailto:${data.email}"
              style="color:#4a703f;font-weight:700;text-decoration:none;">${data.email}</a>
            ${data.phone ? `&nbsp;·&nbsp; <a href="tel:${data.phone}"
              style="color:#4a703f;font-weight:700;text-decoration:none;">${data.phone}</a>` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── FOOTER ── -->
  <tr>
    <td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 36px;
               text-align:center;">
      <p style="margin:0;font-size:11px;color:#9ca3af;">
        Gauyog Kendr · Village Badalpara, Veraval, Gir Somnath, Gujarat 362268
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export class ContactService {
  static async create(data: ContactInput) {
    // 1. Save to DB (using existing columns; new array columns pending migration)
    const locationLine = [data.village, data.district, data.state].filter(Boolean).join(', ');
    const productLine  = (data.products ?? []).length
      ? `Products: ${data.products!.join(', ')}` : '';
    const storedMessage = [locationLine, productLine, data.message].filter(Boolean).join('\n');

    const record = await prisma.contactMessage.create({
      data: {
        name:     data.name,
        email:    data.email,
        phone:    data.phone,
        role:     (data.roles     ?? []).join(', ') || undefined,
        interest: (data.interests ?? []).join(', ') || undefined,
        message:  storedMessage,
      },
    });

    // 2. Send admin notification — read ADMIN_EMAIL_TO fresh from env each call
    const adminEmail = process.env.ADMIN_EMAIL_TO;

    logger.info(`[Contact] New submission from ${data.email} — admin target: ${adminEmail ?? 'NOT SET'}`);

    if (!adminEmail) {
      logger.error('[Contact] ADMIN_EMAIL_TO is not set in .env — email skipped');
      return record;
    }

    try {
      const html = buildAdminEmail(data, record.createdAt);
      await emailService.sendMail({
        to:      adminEmail,
        subject: `New Enquiry from ${data.name}${data.roles?.length ? ` (${data.roles[0]})` : ''} — Gauyog Kendr`,
        html,
        text: [
          '=== NEW ENQUIRY — GAUYOG KENDR ===',
          '',
          `Name     : ${data.name}`,
          `Email    : ${data.email}`,
          `Mobile   : ${data.phone     || '—'}`,
          `Village  : ${data.village   || '—'}`,
          `District : ${data.district  || '—'}`,
          `State    : ${data.state     || '—'}`,
          `You Are  : ${(data.roles     ?? []).join(', ') || '—'}`,
          `Interests: ${(data.interests ?? []).join(', ') || '—'}`,
          `Products : ${(data.products  ?? []).join(', ') || '—'}`,
          '',
          'Message:',
          data.message,
        ].join('\n'),
      });
      logger.info(`[Contact] Admin notification delivered to ${adminEmail}`);
    } catch (err: any) {
      logger.error(`[Contact] Admin email FAILED: ${err?.message}`);
      // Do not rethrow — DB save already succeeded; log is enough
    }

    return record;
  }

  static async list(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;
    const where: Prisma.ContactMessageWhereInput = search
      ? {
          OR: [
            { name:    { contains: search, mode: 'insensitive' } },
            { email:   { contains: search, mode: 'insensitive' } },
            { message: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.contactMessage.count({ where }),
    ]);

    return { messages, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
  }
}
