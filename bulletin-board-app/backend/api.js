const AWS = require('aws-sdk');
const api = require('./api');

jest.mock('aws-sdk', () => {
  const mDocumentClient = {
    put: jest.fn().mockReturnThis(),
    scan: jest.fn().mockReturnThis(),
    query: jest.fn().mockReturnThis(),
    promise: jest.fn()
  };
  return { DynamoDB: { DocumentClient: jest.fn(() => mDocumentClient) } };
});

describe('api tests', () => {
  let documentClient;

  beforeAll(() => {
    documentClient = new AWS.DynamoDB.DocumentClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should write data to DynamoDB', async () => {
    const item = { id: '1', name: 'Test' };
    documentClient.put().promise.mockResolvedValueOnce({});
    
    const result = await api.writeToDynamoDB(item);
    
    expect(documentClient.put).toHaveBeenCalledWith({
      TableName: 'YourTableName',
      Item: item
    });
    expect(result).toEqual({});
  });

  // Add more tests as needed for other functions
});
