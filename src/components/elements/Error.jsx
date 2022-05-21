import PropTypes from "prop-types"

const Error = ({ data }) => (
  <>
    <p>Ups!!! algo extraño pasó</p>
    <p>{data}</p>
  </>
)

export default Error

Error.propTypes = {
  data: PropTypes.any,
}
