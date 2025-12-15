export type FormData = {
  fName: string;
  lName: string;
  email: string;
};

export const validateName = (
  value: string,
  key: 'fName' | 'lName',
  form: FormData,
): string | null => {
  if (!value.trim())
    return `${key === 'fName' ? 'First Name' : 'Last Name'} is required`;

  if ((form.fName + form.lName).length > 50)
    return 'Full name must be less than 50 characters';

  if (!/^[a-zA-Z ]+$/.test(value))
    return `${
      key === 'fName' ? 'First Name' : 'Last Name'
    } must contain only letters`;

  return null;
};

export const validateEmail = (value: string): string | null => {
  if (!value.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email';
  return null;
};

describe('validateName', () => {
  const form: FormData = {
    fName: 'Anand',
    lName: 'Kumar',
    email: 'anand@gmail.com',
  };

  it('fails when first name is empty', () => {
    const result = validateName('', 'fName', form);
    expect(result).toBe('First Name is required');
  });

  it('fails when name contains numbers', () => {
    const result = validateName('Anand123', 'fName', form);
    expect(result).toBe('First Name must contain only letters');
  });

  it('passes for a valid name', () => {
    const result = validateName('Anand', 'fName', form);
    expect(result).toBeNull();
  });
});

describe('validateEmail', () => {
  it('fails when email is empty', () => {
    const result = validateEmail('');
    expect(result).toBe('Email is required');
  });

  it('fails for invalid email format', () => {
    const result = validateEmail('invalid-email');
    expect(result).toBe('Invalid email');
  });

  it('passes for valid email', () => {
    const result = validateEmail('anand@gmail.com');
    expect(result).toBeNull();
  });
});

describe('basic form validation', () => {
  it('passes when all fields are valid', () => {
    const form: FormData = {
      fName: 'Anand',
      lName: 'Kumar',
      email: 'anand@gmail.com',
    };

    expect(validateName(form.fName, 'fName', form)).toBeNull();
    expect(validateName(form.lName, 'lName', form)).toBeNull();
    expect(validateEmail(form.email)).toBeNull();
  });
});
