
export const filters = {

    INSTITUTE_CODE_FILTERS: [
        {
            name: 'search',
            keyword: 'code__icontains',
            type: 'text'
        },
    ],
    INSTITUTE_NAME_FILTERS: [
        {
            name: 'search',
            keyword: 'name__icontains',
            type: 'text'

        },
    ],
    INSTITUTE_STATE_FILTERS: [
        {
            name: 'choice',
            keyword: 'state',
            type: 'choice',
            choices: 'STATE_CHOICES'
        },
        {
            name: 'search',
            keyword: 'state__icontains',
            type: 'text'
        }
    ],
    INSTITUTE_NIRF_FILTERS: [
        {
            name: 'range',
            max_keyword: 'nirf_1__lte',
            min_keyword: 'nirf_1__gte',
            type: 'number',
            min: 0,
            max: 200,
        }
    ],
    INSTITUTE_WEBSITE_FILTERS: [
        {
            name: 'search',
            keyword: 'website__icontains',
            type: 'text'
        },
    ],
    INSTITUTE_FILTER: [
        {
            name: 'search',
            keyword: 'institute_code__name__icontains',
            type: 'text'
        },
    ],
    BRANCH_FILTER: [
        {
            name: 'search',
            keyword: 'branch_code__branch_name__icontains',
            type: 'text'

        },
    ],
    BRANCH_DURATION_FILTER: [
        {
            name: 'choice',
            keyword: 'branch_code__duration',
            choices: 'DURATION_CHOICES',
        }
    ],
    BRANCH_DEGREE_FILTER: [
        {
            name: 'choice',
            keyword: 'branch_code__degree',
            choices: 'DEGREE_CHOICES',
        }

    ],
    SEATS_FILTER: [
        {
            name: 'range',
            max_keyword: 'seats__lte',
            min_keyword: 'seats__gte',
            type: 'number',
            min: 0,
            max: 100,
        }
    ],

    CATEGORY_FILTER: [
        {
            name: 'choice',
            keyword: 'category__category',
            type: 'choice',
            choices: 'CATEGORY_CHOICES'
        }
    ],
    QUOTA_FILTER: [
        {
            name: 'choice',
            keyword: 'quota__quota',
            type: 'choice',
            choices: 'QUOTA_CHOICES'
        }
    ],
    SEAT_POOL_FILTER: [
        {
            name: 'choice',
            keyword: 'seat_pool__seat_pool',
            type: 'choice',
            choices: 'SEAT_POOL_CHOICES'
        }
    ],
    OPENING_RANK_FILTER: [
        {
            name: 'range',
            min_keyword: 'opening_rank_gt',
            max_keyword: 'opening_rank_lt',
            min: 0,
            max: 50000,
            type: 'number',
        }
    ],
    CLOSING_RANK_FILTER: [
        {
            name: 'range',
            min_keyword: 'closing_rank_gt',
            max_keyword: 'closing_rank_lt',
            min: 0,
            max: 50000,
            type: 'number'
        }
    ]
}