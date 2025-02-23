import { TRPCError } from '@trpc/server';
import { hash, verify as verifyHash } from 'argon2';

import { firstRow } from '@sovereign-university/database';

import { Dependencies } from '../../../dependencies';
import { changePasswordQuery, getUserQuery } from '../queries';

export const createChangePassword =
  (dependencies: Dependencies) =>
  async ({
    uid,
    oldPassword,
    newPassword,
  }: {
    uid: string;
    oldPassword: string;
    newPassword: string;
  }) => {
    const { postgres } = dependencies;

    const user = await postgres
      .exec(
        getUserQuery({
          uid,
        }),
      )
      .then(firstRow);

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid credentials',
      });
    }

    if (!user.password_hash) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'This user has no password, try another login method',
      });
    }

    if (!(await verifyHash(user.password_hash, oldPassword))) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid credentials',
      });
    }

    const hashedPassword = await hash(newPassword);
    await postgres.exec(changePasswordQuery(uid, hashedPassword));
  };
