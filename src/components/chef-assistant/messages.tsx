import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { Suspense } from "react";
import Markdown from "react-markdown";

export interface MessagesProps {
  messages: QuerySnapshot<DocumentData> | undefined;
}

export default function Messages({ messages }: MessagesProps) {
  return (
    <>
      {messages?.docs.map((doc) => {
        return (
          doc.data().prompt && (
            <div className="flow-root ml-2 mr-2">
              <div className={"bg-green-800 text-white rounded-md p-2 w-fit"}>
                {doc.data().prompt}
              </div>
              <div
                className={
                  "float-right right-0 bg-neutral-200 px-2 w-fit max-w-[50%] rounded-md"
                }
              >
                {doc.data().status &&
                doc.data().status.state === "COMPLETED" ? (
                  <Markdown className={"markdown"}>
                    {doc.data().response}
                  </Markdown>
                ) : doc.data().status && doc.data().status.state === "ERROR" ? (
                  `Gemini Error: ${doc.data().status.error}`
                ) : (
                  "Cooking..."
                )}
              </div>
            </div>
          )
        );
      })}
    </>
  );
}
