import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../style/ordersTable.css";

const baseURL = "https://myguide.onrender.com/api";
const token = localStorage.getItem("token");

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const showConfirmationToast = (message, onConfirm, onCancel = () => {}) => {
    toast.custom(
      (t) => (
        <div
          className={`confirmation-toast ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <div className="confirmation-content">
            <div className="confirmation-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="confirmation-text">
              <h4>Confirm Action</h4>
              <p>{message}</p>
            </div>
          </div>
          <div className="confirmation-actions">
            <button
              className="confirmation-btn confirmation-btn-cancel"
              onClick={() => {
                toast.dismiss(t.id);
                onCancel();
              }}
            >
              Cancel
            </button>
            <button
              className="confirmation-btn confirmation-btn-confirm"
              onClick={() => {
                toast.dismiss(t.id);
                onConfirm();
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        duration: Number.POSITIVE_INFINITY,
        position: "top-center",
      }
    );
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/purchases/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    const order = orders.find((o) => o.id === orderId);
    const orderInfo = order ? `Order #${order.transaction_id}` : "this order";

    showConfirmationToast(
      `Are you sure you want to change the status of ${orderInfo} to "${newStatus}"?`,
      async () => {
        try {
          const { data: updatedOrder } = await axios.patch(
            `${baseURL}/purchases/${orderId}/status`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setOrders((prev) =>
            prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
          );
          toast.success("Order status updated successfully");
        } catch (err) {
          toast.error("Failed to update order status");
          console.error(err);
        }
      }
    );
  };

  const handleDeleteOrder = async (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    const orderInfo = order ? `Order #${order.transaction_id}` : "this order";

    showConfirmationToast(
      `Are you sure you want to delete ${orderInfo}? This action cannot be undone.`,
      async () => {
        try {
          await axios.delete(`${baseURL}/purchases/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrders(orders.filter((order) => order.id !== orderId));
          toast.success("Order deleted successfully");
        } catch (err) {
          toast.error("Failed to delete order");
          console.error(err);
        }
      }
    );
  };

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="orders-table">
      <div className="table-header">
        <h2>Orders Management</h2>
        <div className="table-stats">
          <span className="stat-item">
            Total Orders: <strong>{orders.length}</strong>
          </span>
          <span className="stat-item">
            Completed:{" "}
            <strong>
              {orders.filter((o) => o.status === "completed").length}
            </strong>
          </span>
          <span className="stat-item">
            Pending:{" "}
            <strong>
              {orders.filter((o) => o.status === "pending").length}
            </strong>
          </span>
        </div>
      </div>

      {showDetails && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Order Details</h3>
              <button
                className="modal-close"
                onClick={() => setShowDetails(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Transaction ID:</span>
                <span>{selectedOrder.transaction_id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">User:</span>
                <span>{selectedOrder.User?.name || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Course:</span>
                <span>{selectedOrder.Course?.title || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span>
                  {new Date(selectedOrder.purchase_date).toLocaleDateString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Method:</span>
                <span>{selectedOrder.payment_method}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge ${selectedOrder.status}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span>${selectedOrder.Course?.price || "0.00"}</span>
              </div>
              {selectedOrder.proof_of_payment && (
                <div className="detail-row">
                  <span className="detail-label">Proof of Payment:</span>
                  <a
                    href={selectedOrder.proof_of_payment}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn-close"
                onClick={() => setShowDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Course</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.transaction_id}</td>
                  <td>{order.User?.name || "N/A"}</td>
                  <td>{order.Course?.title || "N/A"}</td>
                  <td>{new Date(order.purchase_date).toLocaleDateString()}</td>
                  <td>
                    <span className={`payment-method ${order.payment_method}`}>
                      {order.payment_method}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                      className={`status-select ${order.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  </td>
                  <td>${order.Course?.price || "0.00"}</td>
                  <td>
                    <button
                      className="btn-view"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowDetails(true);
                      }}
                    >
                      View
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3>No orders found</h3>
            <p>There are currently no orders to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;