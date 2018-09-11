import { Contact } from "../classes/Contact";

const getFullName = (contact: Contact) => {
  const { title, firstName, lastName } = contact;
  let fullName = '';
  fullName += title ? `${title} ` : '';
  fullName += firstName ? `${firstName} ` : '';
  fullName += lastName ? `${lastName} ` : '';
  return fullName;
};

export { getFullName };
