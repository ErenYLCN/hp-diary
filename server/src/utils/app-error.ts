class AppError extends Error {
  statusCode: number;
  code?: number;
  errors?: Record<string, { message: string }>;
  reason?: {
    value?: string;
    path?: string;
    kind?: string;
  };

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
