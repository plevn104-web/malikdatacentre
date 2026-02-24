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

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ siteName, confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your login link for MALIK DATA CENTRE</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src="https://ivrwcmtjruvritolfpae.supabase.co/storage/v1/object/public/email-assets/logo.png?v=1" alt="MALIK DATA CENTRE" width="160" style={{ margin: '0 auto 24px', display: 'block' }} />
        <Heading style={h1}>Your Login Link</Heading>
        <Text style={text}>Click the button below to log in to your Creator Studio account. This link will expire shortly.</Text>
        <Button style={button} href={confirmationUrl}>Log In</Button>
        <Hr style={hr} />
        <Text style={footer}>If you didn't request this link, you can safely ignore this email.</Text>
        <Text style={footer}><Link href="https://malikdatacentre.lovable.app" style={footerLink}>MALIK DATA CENTRE</Link></Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '32px 28px', maxWidth: '480px', margin: '0 auto' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, fontFamily: "'Space Grotesk', Arial, sans-serif", color: '#0a0c10', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#555555', lineHeight: '1.6', margin: '0 0 20px' }
const button = { backgroundColor: '#0099ff', color: '#0a0c10', fontSize: '15px', fontWeight: 'bold' as const, fontFamily: "'Space Grotesk', Arial, sans-serif", borderRadius: '12px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' as const }
const hr = { borderColor: '#e5e5e5', margin: '28px 0' }
const footer = { fontSize: '12px', color: '#999999', margin: '0 0 8px', lineHeight: '1.5' }
const footerLink = { color: '#0099ff', textDecoration: 'none' }
