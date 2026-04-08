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
    await AuthService.forgotPassword(req.body.email);
    res.status(200).json(
      formatResponse(
        true,
        'If an account with this email exists, a reset link has been sent'
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
