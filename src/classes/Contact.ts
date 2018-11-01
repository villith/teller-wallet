import { uuid } from '../helpers/createGuid';

class Contact {
  public id: string = uuid();
  public address: string;
  public title?: string;
  public firstName: string;
  public lastName: string;
  public favorite: boolean;
  public description?: string;
  public notes?: string[];

  constructor(address: string, firstName: string, lastName: string, title?: string, description?: string,
    notes?: string[], favorite?: boolean)
  {
    this.address = address;
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description || '';
    this.notes = notes || [];
    this.favorite = favorite || false;
  }
}

enum ContactFilterables {
  address = 'address',
  title = 'title',
  firstName = 'firstName',
  lastName = 'lastName',
  favorite = 'favorite'
};

export { Contact, ContactFilterables }