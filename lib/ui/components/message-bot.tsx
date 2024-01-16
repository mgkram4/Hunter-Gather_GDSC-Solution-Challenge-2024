export default function MessageBot() {
  return (
    <div
      id="floating-message-icon"
      className="fixed bottom-4 right-4 p-4 text-gray-500 bg-white rounded-full shadow-lg "
      role="alert"
    >
      <div className="flex">
        <div className="inline-flex items-center justify-center w-8 h-8 text-green-500 bg-green-100 rounded-full ">
          <span className="sr-only">Message icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 ">
            Ask a question
          </span>
          <div className="mb-2 text-sm font-normal">
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
