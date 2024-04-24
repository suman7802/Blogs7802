import sendOTP from './sendOTP';
import generateOTP from './generateOTP';
import {PrismaClient} from '@prisma/client';
import existingUser from './existingUser';

const prisma = new PrismaClient();

export default async function getCreateUser(email: string) {
  const user = await existingUser(email);

  if (!user) {
    const {hashedOTP, OTP} = await generateOTP();
    await sendOTP(OTP, email);
    const newUser = await prisma.user.create({
      data: {
        email,
        otp: hashedOTP,
        otpExpiry: new Date(Date.now() + 60000 * 3),
      },
    });

    return {
      email: newUser.email,
      OTPExpire: newUser.otpExpiry,
    };
  }

  const OTPExpire = new Date(Date.now()) > user.otpExpiry;

  if (OTPExpire) {
    const {hashedOTP, OTP} = await generateOTP();
    await sendOTP(OTP, email);
    const updatedUser = await prisma.user.update({
      where: {email},
      data: {
        otp: hashedOTP,
        otpExpiry: new Date(Date.now() + 60000 * 3),
      },
    });

    return {
      email: updatedUser.email,
      OTPExpire: updatedUser.otpExpiry,
    };
  } else {
    return {
      alreadySent: true,
      OTPExpire: user.otpExpiry,
    };
  }
}
