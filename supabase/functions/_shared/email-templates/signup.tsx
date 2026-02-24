/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Verify Your Creator Studio Account</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://ivrwcmtjruvritolfpae.supabase.co/storage/v1/object/public/email-assets/logo.png?v=1"
          alt="MALIK DATA CENTRE"
          width="160"
          style={{ margin: '0 auto 24px', display: 'block' }}
        />
        <Heading style={h1}>Welcome to AI Creator Studio!</Heading>
        <Text style={text}>
          Thanks for signing up,{' '}
          <Link href={`mailto:${recipient}`} style={link}>{recipient}</Link>.
        </Text>
        <Text style={text}>
          Click the button below to verify your email and start using powerful YouTube growth tools.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Verify Email
        </Button>
        <Text style={expiry}>This link expires in 24 hours.</Text>
        <Hr style={hr} />
        <Text style={footer}>
          If you did not create this account, please ignore this email.
        </Text>
        <Text style={footer}>
          <Link href={siteUrl} style={footerLink}>MALIK DATA CENTRE</Link>
          {' '}— World's Most Trusted AI Tools & Digital Services Provider
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '480px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, fontFamily: "'Space Grotesk', Arial, sans-serif", color: '#0a0c10', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#555555', lineHeight: '1.6', margin: '0 0 20px' }
const link = { color: '#0099ff', textDecoration: 'underline' }
const button = { backgroundColor: '#0099ff', color: '#0a0c10', fontSize: '15px', fontWeight: 'bold' as const, fontFamily: "'Space Grotesk', Arial, sans-serif", borderRadius: '12px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' as const }
const expiry = { fontSize: '13px', color: '#888888', margin: '16px 0 0' }
const hr = { borderColor: '#e5e5e5', margin: '28px 0' }
const footer = { fontSize: '12px', color: '#999999', margin: '0 0 8px', lineHeight: '1.5' }
const footerLink = { color: '#0099ff', textDecoration: 'none' }
