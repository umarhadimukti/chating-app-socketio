import moment from "moment";

interface FormattedMessage {
  username: string;
  message: string;
  time: string;
}

export const formatMessage = (username: string, message: string): FormattedMessage => {
    const localTime = moment().local();

    return {
        username,
        message,
        time: localTime.format('HH.mm'),
    };
}