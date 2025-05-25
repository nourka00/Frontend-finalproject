// OrdersTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../style/ordersTable.css"; // Assuming you have a CSS file for styling
const baseURL = "https://myguide.onrender.com/api";
const token = localStorage.getItem("token");

const Modal = ({ title, children, onClose }) => (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h3>{title}</h3>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="modal-body">{children}</div>
      <div className="modal-footer">
        <button className="btn-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  </div>
);

const OrderDetailsModal = ({ order, onClose }) => (
  <Modal title="Order Details" onClose={onClose}>
    {["transaction_id", "payment_method", "status"].map((key) => (
      <div key={key} className="detail-row">
        <span className="detail-label">{key.replace(/_/g, " ")}:</span>
        <span>{order[key]}</span>
      </div>
    ))}
    <div className="detail-row">
      <span className="detail-label">User:</span>
      <span>{order.User?.name || "N/A"}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Course:</span>
      <span>{order.Course?.title || "N/A"}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Date:</span>
      <span>{new Date(order.purchase_date).toLocaleDateString()}</span>
    </div>
    <div className="detail-row">
      <span className="detail-label">Amount:</span>
      <span>${order.Course?.price || "0.00"}</span>
    </div>
    {order.proof_of_payment && (
      <div className="detail-row">
        <span className="detail-label">Proof of Payment:</span>
        <a
          href={order.proof_of_payment}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Document
        </a>
      </div>
    )}
  </Modal>
);

const StatusUpdateModal = ({ currentStatus, onUpdate, onClose }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(selectedStatus);
  };

  return (
    <Modal title="Update Order Status" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-select"
          >
            {["pending", "completed", "failed"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-save">
            Update Status
          </button>
        </div>
      </form>
    </Modal>
  );
};

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${baseURL}/purchases/orders`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Update the handleStatusUpdate function in OrdersTable.jsx
  const handleStatusUpdate = async (newStatus) => {
    try {
      const { data: updatedOrder } = await axios.patch(
        `${baseURL}/purchases/${selectedOrder.id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
      );
      setShowStatusModal(false);
      toast.success("Order status updated successfully");
    } catch (err) {
      toast.error("Failed to update order status");
      console.error(err);
    }
  };
  const handleDeleteOrder = async (orderId) => {
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
  };
  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="orders-table">
      <h2>Orders Management</h2>
      <table>
        <thead>
          <tr>
            {[
              "Order ID",
              "User",
              "Course",
              "Date",
              "Payment Method",
              "Status",
              "Amount",
              "Actions",
            ].map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.transaction_id}</td>
              <td>{order.User?.name || "N/A"}</td>
              <td>{order.Course?.title || "N/A"}</td>
              <td>{new Date(order.purchase_date).toLocaleDateString()}</td>
              <td>
                <span className={`payment-method ${order.payment_method}`}>
                  {order.payment_method}
                </span>
              </td>
              <td>
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </td>
              <td>${order.Course?.price || "0.00"}</td>
              <td>
                <button
                  className="btn-view"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowDetailsModal(true);
                  }}
                >
                  View
                </button>
                <button
                  className="btn-update"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowStatusModal(true);
                  }}
                >
                  Update Status
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this order?"
                      )
                    ) {
                      handleDeleteOrder(order.id);
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDetailsModal && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
      {showStatusModal && selectedOrder && (
        <StatusUpdateModal
          currentStatus={selectedOrder.status}
          onUpdate={handleStatusUpdate}
          onClose={() => setShowStatusModal(false)}
        />
      )}
    </div>
  );
};

export default OrdersTable;

