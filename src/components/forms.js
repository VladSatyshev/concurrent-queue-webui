import { useState, useEffect } from "react";
import { queueClient } from "../../client/client";

const SubscribeForm = () => {
  const [subscribeName, setSubscribeName] = useState("");
  const [subscribeQueue, setSubscribeQueue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await queueClient.addSubscriber(subscribeQueue, subscribeName);
    alert(res);
  };

  return (
    <div style={{ width: "fit-content" }}>
      Subscibe to queue
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="subscribeName"
            value={subscribeName}
            onChange={(e) => setSubscribeName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="queue">Queue name:</label>
          <input
            type="text"
            id="subscribeQueue"
            value={subscribeQueue}
            onChange={(e) => setSubscribeQueue(e.target.value)}
          />
        </div>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

const ConsumeForm = () => {
  const [consumeName, setConsumeName] = useState("");
  const [consumeQueue, setConsumeQueue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращает перезагрузку страницы
    console.log(`Имя: ${consumeName}, Очередь: ${consumeQueue}`); // Вывод значений в консоль
  };

  return (
    <div style={{ width: "fit-content" }}>
      Consume from queue
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="consumeName"
            value={consumeName}
            onChange={(e) => setConsumeName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="queue">Queue name:</label>
          <input
            type="text"
            id="consumeQueue"
            value={consumeQueue}
            onChange={(e) => setConsumeQueue(e.target.value)}
          />
        </div>
        <button type="submit">Consume</button>
      </form>
    </div>
  );
};

const PutMessageForm = () => {
  const [putMessage, setPutMessage] = useState("");
  const [putMessageQueue, setPutMessageQueue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await queueClient.addMessage(putMessageQueue, {
      msg: putMessage,
    });
    window.alert(res);
  };

  return (
    <div style={{ width: "fit-content" }}>
      Put message to queue
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="queue">Queue name:</label>
          <input
            type="text"
            id="putMessageQueue"
            value={putMessageQueue}
            onChange={(e) => setPutMessageQueue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="putMessage"
            value={putMessage}
            onChange={(e) => setPutMessage(e.target.value)}
          />
        </div>
        <button type="submit">Put message</button>
      </form>
    </div>
  );
};

const GetQueueForm = ({ queueName, setQueueName, setQueue }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setQueue(await queueClient.getByName(queueName));
  };

  return (
    <div style={{ width: "fit-content" }}>
      Get queue data
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="queue">Queue name:</label>
          <input
            type="text"
            id="queue"
            value={queueName}
            onChange={(e) => setQueueName(e.target.value)}
          />
        </div>
        <button type="submit">Get Queue</button>
      </form>
    </div>
  );
};

export { PutMessageForm, ConsumeForm, SubscribeForm, GetQueueForm };
