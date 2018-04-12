import React from 'react';
import { Card, CardBody, CardTitle, Badge, CardText, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const TaskDisplayItem = (props) => {
    const { id, title, description, color, category } = props;
    return (
        <Card inverse className={color}>
            <CardBody>
                <CardTitle>{title}</CardTitle>
                {category !== '' ? (
                    <Badge color="secondary" className="text-default">
                        {category}
                    </Badge>
                ) : null}
                <CardText>{description}</CardText>
                <Button color="default">
                    <NavLink to={`/admin/task/${id}`}>View</NavLink>
                </Button>
            </CardBody>
        </Card>
    );
};

TaskDisplayItem.defaultProps = {
    category: ''
};

TaskDisplayItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    category: PropTypes.string
};

export default TaskDisplayItem;
