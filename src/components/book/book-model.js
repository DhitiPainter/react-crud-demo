import PropTypes from 'prop-types';

export class Book {
    ID = 0;
    Title = '';
    Description = '';
    PageCount = '';
    PublishDate = '';
    Excerpt = '';
}

Book.prototypes = {
    ID: PropTypes.number,
    Title: PropTypes.string,
    Description: PropTypes.string,
    PageCount: PropTypes.number,
    PublishDate: PropTypes.string,
    Excerpt: PropTypes.string
}

