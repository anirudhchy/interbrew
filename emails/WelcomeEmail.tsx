import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Icons } from "@/components/sub/icons";
import * as React from "react";

interface WelcomeEmailProps {
  name: string;
  url: string;
}

export const WelcomeEmail = ({ name, url }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Next generation Interview Experience with Interbrew</Preview>
    <Body style={main}>
      <Container style={container}>
        <Icons.logo style={logo} />
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          Welcome to Interbrew, get ready to filter the best pool of talent with
          AI powered smart interviews.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={url}>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Interbrew team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>410 Hudson Rd - New Delhi, IND 254029</Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  marginTop: "20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "10px 20px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
