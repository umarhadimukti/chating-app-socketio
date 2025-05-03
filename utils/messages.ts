import moment from "moment";

interface FormattedMessage {
  username: string;
  message: string;
  time: string;
}

export const formatMessage = (username: string, message: string): FormattedMessage => {
    return {
        username,
        message,
        time: moment().format("h:mm a"),
    };
}