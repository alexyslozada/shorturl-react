const ShortURL = ({ short }) => {
  const dateFormat = new Date(short.created_at * 1000).toLocaleString();
  return (
    <div>
      <span>ID:</span>
      <span>{short.id}</span>
      <p>
        Short:
        {short.short}
      </p>
      <p>
        Redirect:
        {short.redirect_to}
      </p>
      <p>
        Description:
        {short.description}
      </p>
      <p>
        Times:
        <b>{short.times}</b>
      </p>
      <p>
        Created at:
        {dateFormat}
      </p>
      <p>{short.created_at}</p>
    </div>
  );
}

export default ShortURL;
