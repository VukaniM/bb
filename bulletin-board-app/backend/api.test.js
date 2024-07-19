const AWS = require('aws-sdk');
const { handler } = require('./api');

// Mock the DynamoDB DocumentClient
const mockPut = jest.fn();
AWS.DynamoDB.DocumentClient.prototype.put = mockPut;

describe('API Tests', () => {
  beforeEach(() => {
    mockPut.mockReset();
  });

  test('should write event to DynamoDB', async () => {
    mockPut.mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    });

    const event = {
      body: JSON.stringify({ id: '1', title: 'Test Event', detail: 'This is a test event', date: '2024-07-18' }),
    };

    const context = {};
    const result = await handler(event, context);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ message: 'Event added!' });
    expect(mockPut).toHaveBeenCalledTimes(1);
    expect(mockPut).toHaveBeenCalledWith({
      TableName: 'your-dynamodb-table-name',
      Item: JSON.parse(event.body),
    });
  });
});
