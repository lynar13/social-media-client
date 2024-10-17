import { logout } from '/src/js/api/auth/logout.js';

test('logout function clears the token from browser storage', () => {
    localStorage.setItem('token', '123456');
    logout();
    expect(localStorage.getItem('token')).toBeNull();
  });