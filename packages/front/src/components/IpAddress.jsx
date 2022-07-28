import React, { useState, useCallback, useRef, useEffect } from "react";
import { createIp, deleteIp, fetchIps } from "../utils/api-calls";
import { Container, Spinner } from "react-bootstrap";

const IpAddress = ({ token, setMessage, setType, setShow }) => {
  const [ips, setIps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ipRef = useRef();

  const getIps = useCallback(async () => {
    const response = await fetchIps(token);

    if (response.status === 200 || response.status === 201) {
      setIps(response.data.ips);
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    getIps();
  }, [getIps]);

  const createIpHandler = async (e) => {
    e.preventDefault();

    const ip = ipRef.current.value;

    const response = await createIp(token, { ip });

    if (response.status === 200 || response.status === 201) {
      ipRef.current.value = "";
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setIsLoading(true);
      getIps();
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };

  const deleteIpHandler = async (id) => {
    const response = await deleteIp(token, id);
    if (response.status === 200 || response.status === 201) {
      setMessage(response.data?.message);
      setType("success");
      setShow(true);
      setIsLoading(true);
      getIps();
    } else {
      setMessage(response.data?.message);
      setType("danger");
      setShow(true);
    }
  };
  return (
    <>
      <div className="container mt-5 py-5">
        <form onSubmit={createIpHandler}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="example: 192.168.1.1"
              aria-label="IP Address"
              aria-describedby="button-addon2"
              ref={ipRef}
              required
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              id="button-addon2"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        {isLoading ? (
          <Container className="d-flex mt-5 pt-5 justify-content-center align-items-center">
            <Spinner animation="border" />
          </Container>
        ) : (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">IP address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {ips.map(({ id, ip }, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{ip}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        deleteIpHandler(id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default IpAddress;
