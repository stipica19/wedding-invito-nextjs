export default function RSVPForm() {
  return (
    <form className="mt-6 grid gap-4 rounded-lg border border-gray-200 p-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Attendance</label>
        <select className="mt-1 w-full rounded border border-gray-300 px-3 py-2">
          <option>Yes</option>
          <option>No</option>
          <option>Maybe</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Add a note"
          rows={3}
        />
      </div>
      <button
        type="button"
        className="rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Submit RSVP (TODO)
      </button>
    </form>
  );
}
