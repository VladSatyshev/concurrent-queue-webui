import axios from "axios";

class QueueClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getByName(queueName) {
    try {
      const response = await this.client.get(`/v1/int/queues/${queueName}`);
      return response.data;
    } catch (error) {
      console.error("Error in getByName:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.client.get("/v1/int/queues/");
      return response.data;
    } catch (error) {
      console.error("Error in getAll:", error);
      throw error;
    }
  }

  async addMessage(queueName, body) {
    try {
      const response = await this.client.post(
        `/queues/${queueName}/messages/`,
        body
      );
      return response.data;
    } catch (error) {
      console.error("Error in addMessage:", error);
      throw error;
    }
  }

  async addSubscriber(queueName, subscriberName) {
    try {
      const response = await this.client.post(
        `/v1/queues/${queueName}/subscriptions`,
        null,
        {
          headers: {
            "X-Subscriber": subscriberName,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in addSubscriber:", error);
      throw error;
    }
  }

  async consumeMessages(queueName, subscriberName) {
    try {
      const response = await this.client.get(`/queues/${queueName}/messages/`, {
        headers: {
          "X-Subscriber": subscriberName,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in consumeMessages:", error);
      throw error;
    }
  }
}

export const queueClient = new QueueClient("http://localhost:8000/");
