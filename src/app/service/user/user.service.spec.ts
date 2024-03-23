import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mocking HTTP requests
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding HTTP requests after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a user by ID', () => {
    const userId = 1;
    const mockUser = { id: userId, name: 'John Doe' };

    service.getUserById(userId).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/users/${userId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockUser); // Mock the HTTP response
  });

  it('should create a new user', () => {
    const userData = { name: 'Jane Doe', email: 'jane@example.com' };
    const mockResponse = { id: 2, ...userData };

    service.createUser(userData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/users');
    expect(req.request.method).toBe('POST');

    req.flush(mockResponse); // Mock the HTTP response
  });

  // Add more test cases for updateUser and deleteUser methods as needed
});
