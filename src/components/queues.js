import { useState, useEffect } from "react";
import { GetQueueForm } from "./forms";

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

const GetQueue = () => {
  const [queueName, setQueueName] = useState("");
  const [queue, setQueue] = useState(null);

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

export { QueueItem, QueuesList, GetQueue, GetQueueForm };
