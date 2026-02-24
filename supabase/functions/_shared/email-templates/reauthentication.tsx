/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
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

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your verification code for MALIK DATA CENTRE</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src="https://ivrwcmtjruvritolfpae.supabase.co/storage/v1/object/public/email-assets/logo.png?v=1" alt="MALIK DATA CENTRE" width="160" style={{ margin: '0 auto 24px', display: 'block' }} />
        <Heading style={h1}>Your Verification Code</Heading>
        <Text style={text}>Use the code below to confirm your identity:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Hr style={hr} />
        <Text style={footer}>This code will expire shortly. If you didn't request this, you can safely ignore this email.</Text>
        <Text style={footer}><Link href="https://malikdatacentre.lovable.app" style={footerLink}>MALIK DATA CENTRE</Link></Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '480px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, fontFamily: "'Space Grotesk', Arial, sans-serif", color: '#0a0c10', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#555555', lineHeight: '1.6', margin: '0 0 20px' }
const codeStyle = { fontFamily: 'Courier, monospace', fontSize: '28px', fontWeight: 'bold' as const, color: '#0099ff', backgroundColor: '#f0f9ff', padding: '16px 24px', borderRadius: '12px', margin: '0 0 24px', textAlign: 'center' as const, display: 'block' as const }
const hr = { borderColor: '#e5e5e5', margin: '28px 0' }
const footer = { fontSize: '12px', color: '#999999', margin: '0 0 8px', lineHeight: '1.5' }
const footerLink = { color: '#0099ff', textDecoration: 'none' }
