import WelcomeEmail from "./WelcomeEmail";
import MagicLinkEmail from "./MagicLinkEmail";
import { render } from "@react-email/render";
import type { user } from "@/db/schema";

type getEmailHtmlProps = {
  user: user | undefined;
  url: string;
};

export const getEmailHtml: (props: getEmailHtmlProps) => string = ({
  user,
  url,
}) => {
  return user?.emailVerified
    ? render(<MagicLinkEmail url={url} name={user?.name || ""} />)
    : render(<WelcomeEmail url={url} name={user?.name || ""} />);
};

export default getEmailHtml;
