// eslint-disable-next-line react/prop-types
const ShortURL = ({ short, delShortURL }) => {
  let dateFormat = new Date().toLocaleString()
  if (short.created_at > 0) {
    dateFormat = new Date(short.created_at * 1000).toLocaleString()
  }

  return (
    <div className="max-w-xl p-4">
      <div className="p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">{short.short}</h2>
        <p>
          Redirect:
          {' '}
          {short.redirect_to}
        </p>
        <p>
          Times:
          <span className="text-xs px-2 py-0.5 font-bold bg-gray-100 text-gray-600 rounded">{short.times}</span>
        </p>
        <p className="text-gray-600">{short.description}</p>
        <p>
          Created at:
          {' '}
          {dateFormat}
        </p>
        <br />
        <button className="px-6 py-2 text-white bg-red-600" type="button" onClick={delShortURL}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ShortURL;
