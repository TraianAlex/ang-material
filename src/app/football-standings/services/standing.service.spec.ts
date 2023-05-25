import { TestBed } from '@angular/core/testing';

import { StandingService } from './standing.service';

describe('StandingService', () => {
  let service: StandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

// describe('fetchStandings', () => {
//   let service: StandingService;
//   it('should get standings correctly', (done) => {
//     // Create a mock API call using `fetch` or your favorite library
//     const mockApiResponse = {
//       standings: [
//         { table: [/* test data */] }
//       ]
//     };
    
//     const { _teams, API } = this;
//     service.fetchStandings(league): void {
//       // Perform an API call against the same API endpoint being called by `fetchStandings()`,
//       // passing in a mocked API response as the return payload
//       fetchMock.get(`${API}${this.leagues[`${league}`]}/standings`, mockApiResponse);
  
//       // Call `fetchStandings()` with the `league` arg that you'd like to test
//       fetchStandings(league);
  
//       // Assert that calling `fetchStandings()` populated `_teams`
//       // with the expected data from the mocked API call
//       expect(_teams.next).toHaveBeenCalledWith(mockApiResponse.standings[0].table);
//       done();
//     });
// });

