import { login } from '../../api/auth/login';
import { save } from "../../storage/index";
/** Mock localStorage */ 
jest.mock('../../storage/index', () => ({
  save: jest.fn(),
}));

describe('login function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should store the token and profile on successful login', async () => {
    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ accessToken: 'mockToken', name: 'Test User' }),
      })
    );

    const profile = await login('user@stud.noroff.no', 'validPassword');

    expect(fetch).toHaveBeenCalledWith('http://your-api-path/social/auth/login', expect.any(Object));
    expect(save).toHaveBeenCalledWith('token', 'mockToken');
    expect(save).toHaveBeenCalledWith('profile', { name: 'Test User' });
    expect(profile).toEqual({ name: 'Test User' });
  });

  test('should throw an error for an unsuccessful login', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false, statusText: 'Unauthorized' }));

    await expect(login('invalid@stud.noroff.no', 'wrongPassword')).rejects.toThrow('Unauthorized');
  });
});