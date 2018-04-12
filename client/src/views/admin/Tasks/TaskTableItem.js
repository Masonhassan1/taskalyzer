import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Badge, Progress, Button, Modal } from 'reactstrap';

const calculateProgress = (todos) => {
    let progress = 0;
    let completed = 0;
    todos.forEach((todo) => {
        if (todo.completed) {
            completed += 1;
        }
    });
    progress = (completed / todos.length) * 100;
    return progress;
};

const TaskTableItem = (props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggle = () => setModalOpen(!modalOpen);

    const { id, title, category, todos, onDelete } = props;
    const progress = calculateProgress(todos);
    return (
        <>
            <tr key={id}>
                <th scope="row">
                    <NavLink to={`/admin/task/${id}`}>
                        <h4>{title}</h4>
                    </NavLink>
                </th>
                <td>
                    <Badge color="primary" className="text-default bg-">
                        {category}
                    </Badge>
                </td>
                <td>
                    {progress === 100 ? (
                        <Badge color="" className="badge-dot mr-4">
                            <i className="bg-primary" />
                            completed
                        </Badge>
                    ) : (
                        <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            pending
                        </Badge>
                    )}
                </td>
                <td>
                    <div className="d-flex align-items-center">
                        <span className="mr-2">{Number(progress.toFixed(2))}%</span>
                        <div>
                            <Progress
                                max="100"
                                value={progress}
                                barClassName="bg-primary"
                            />
                        </div>
                    </div>
                </td>
                <td>
                    <Button
                        className="btn-icon btn-3"
                        id="deleteButton"
                        color="secondary"
                        type="button"
                        size="sm"
                        onClick={toggle}
                    >
                        <span className="btn-inner--icon">
                            <i className="ni ni-fat-remove" />
                        </span>
                        <span className="btn-inner--text">Remove</span>
                    </Button>
                    <Modal
                        className="modal-dialog-centered modal-danger"
                        contentClassName="bg-gradient-danger"
                        isOpen={modalOpen}
                        toggle={() => toggle('notificationModal')}
                    >
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="modal-title-notification"
                            >
                                Your attention is required!
                            </h5>
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => toggle('notificationModal')}
                            >
                                <span aria-hidden>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="py-1 text-center">
                                <i className="fa fa-info-circle 3x" />
                                <h4 className="heading mt-4">
                                    Sure you want to delete this Task?
                                </h4>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button
                                className="btn-white"
                                color="default"
                                type="button"
                                onClick={() => onDelete(id)}
                            >
                                Delete
                            </Button>
                            <Button
                                className="text-white ml-auto"
                                color="link"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => toggle('notificationModal')}
                            >
                                Close
                            </Button>
                        </div>
                    </Modal>
                </td>
            </tr>
        </>
    );
};

TaskTableItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    todos: PropTypes.any.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TaskTableItem;
