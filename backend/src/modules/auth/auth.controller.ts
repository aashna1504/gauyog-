import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { formatResponse } from '../../utils/helpers';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.signup(req.body);
    res.status(201).json(formatResponse(true, 'Signup successful', result));
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json(formatResponse(true, 'Login successful', result));
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.googleAuth(req.body.credential);
    res.status(200).json(formatResponse(true, 'Google authentication successful', result));
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      await AuthService.logout(req.user.userId);
    }
    res.status(200).json(formatResponse(true, 'Logout successful'));
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;
    const result = await AuthService.refreshToken(refreshToken);
    res.status(200).json(formatResponse(true, 'Token refreshed successfully', result));
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.forgotPassword(req.body.email);
    const isDev = process.env.NODE_ENV === 'development';

    // In production we always return the same message (prevents email enumeration)
    // In dev we include the reset link directly so the full flow can be tested
    res.status(200).json(
      formatResponse(
        true,
        result?.emailDelivered
          ? 'Reset link sent! Check your email inbox.'
          : 'If an account with this email exists, a reset link has been sent.',
        isDev ? { devResetLink: result?.devResetLink ?? null, emailDelivered: result?.emailDelivered ?? false } : null
      )
    );
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthService.resetPassword(req.body.token, req.body.password);
    res.status(200).json(formatResponse(true, 'Password reset successful'));
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await AuthService.getProfile(req.user!.userId);
    res.status(200).json(formatResponse(true, 'Profile retrieved', user));
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await AuthService.updateProfile(req.user!.userId, req.body.name);
    res.status(200).json(formatResponse(true, 'Profile updated', user));
  } catch (error) {
    next(error);
  }
};
