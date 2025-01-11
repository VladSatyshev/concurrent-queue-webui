"use client";

import { useState, useEffect } from "react";
import { queueClient } from "../../client/client";

const QueueItem = ({ name, maxLength, maxSub, subs, messages }) => {
  return (
    <div
      display="flex"
      style={{
        flexDirection: "column",
        margin: "10px",
        border: "1px solid blue",
      }}
    >
      Queue name: {name} <br />
      MaxLength: {maxLength} <br />
      MaxSubscribers: {maxSub} <br />
      Subscribers: {JSON.stringify(subs, null, 2)}
      <br />
      Messages: {JSON.stringify(messages, null, 2)}
      <br />
    </div>
  );
};

const QueuesList = () => {
  const [queueList, setQueueList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await queueClient.getAll();
        if (!Array.isArray(res)) {
          setQueueList([]);
          return;
        }
        setQueueList(res);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return loading ? (
    <div>Loading</div>
  ) : (
    <div
      style={{
        flexDirection: "column",
        width: "fit-content",
        border: "1px solid",
        width: "30%",
      }}
    >
      {queueList.map((queue) => {
        return (
          <QueueItem
            key={queue.Name}
            name={queue.Name}
            maxLength={queue.MaxLength}
            maxSub={queue.MaxSubscribers}
            subs={queue.Subscribers}
            messages={queue.Messages}
          />
        );
      })}
    </div>
  );
};

const SubscribeForm = () => {
  const [name, setName] = useState("");
  const [queue, setQueue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await queueClient.addSubscriber(queue, name);
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
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="queue">Queue name:</label>
          <input
            type="text"
            id="queue"
            value={queue}
            onChange={(e) => setQueue(e.target.value)}
          />
        </div>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

const ConsumeForm = () => {
  const [name, setName] = useState("");
  const [queue, setQueue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращает перезагрузку страницы
    console.log(`Имя: ${name}, Очередь: ${queue}`); // Вывод значений в консоль
  };

  return (
    <div style={{ width: "fit-content" }}>
      Consume from queue
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="queue">Queue name:</label>
          <input
            type="text"
            id="queue"
            value={queue}
            onChange={(e) => setQueue(e.target.value)}
          />
        </div>
        <button type="submit">Consume</button>
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

const PutMessageForm = () => {
  const [message, setMessage] = useState("");
  const [queue, setQueue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await queueClient.addMessage(queue, { msg: message });
    alert(res);
  };

  return (
    <div style={{ width: "fit-content" }}>
      Put message to queue
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="queue">Queue name:</label>
          <input
            type="text"
            id="queue"
            value={queue}
            onChange={(e) => setQueue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Put message</button>
      </form>
    </div>
  );
};

const GetQueue = () => {
  const [queueName, setQueueName] = useState("");
  const [queue, setQueue] = useState(null);
  useEffect(() => {
    console.log(queue);
  }, [queue]);

  return (
    <>
      <GetQueueForm
        queueName={queueName}
        setQueueName={setQueueName}
        setQueue={setQueue}
      />
      {queue !== null && (
        <QueueItem
          key={queue.Name}
          name={queue.Name}
          maxLength={queue.MaxLength}
          maxSub={queue.MaxSubscribers}
          subs={queue.Subscribers}
          messages={queue.Messages}
        />
      )}
    </>
  );
};

const MainPage = () => {
  return (
    <>
      <SubscribeForm />
      <ConsumeForm />
      <PutMessageForm />
      <GetQueue />
    </>
  );
};

export default MainPage;
