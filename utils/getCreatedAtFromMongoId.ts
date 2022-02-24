import { format } from "date-fns";

const getCreatedAtFromMongoId = (mongoId: string): string => {
  return format(new Date(parseInt(mongoId.substring(0, 8), 16) * 1000), "PPpp");
};

export default getCreatedAtFromMongoId;
