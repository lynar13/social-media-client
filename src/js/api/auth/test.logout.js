import { logout } from './logout';
import { remove } from '../../storage/index';

jest.mock('../../storage/index', () => ({
  remove: jest.fn(),
}));

describe('logout function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should remove token and profile from storage on logout', () => {
    logout();

    expect(remove).toHaveBeenCalledWith('token');
    expect(remove).toHaveBeenCalledWith('profile');
  });
});
