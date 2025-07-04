"use client";

import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_h2ixgDZEz",
      userPoolClientId: "6j4nc3kkioj2pvln7r7o8un6nf",
      identityPoolId: "us-east-1:2037428b-e67b-4fa9-b157-01eb505359f0",
    },
  },
  Storage: {
    S3: {
      bucket: "on-pretty-stage-cognitost-onprettymtuploadbucketf7-w3avrcs5u6tq",
      region: "us-east-1",
    },
  },
});

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}