import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';

export class SayBriefly implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SayBriefly',
		name: 'sayBriefly',
		icon: { light: 'file:../../icons/saybriefly.svg', dark: 'file:../../icons/saybriefly.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Read SayBriefly meeting recaps and to-dos, and add to-dos',
		defaults: {
			name: 'SayBriefly',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'sayBrieflyApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://public-api.saybriefly.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Meeting', value: 'meeting' },
					{ name: 'To-Do', value: 'todo' },
				],
				default: 'meeting',
			},

			// Meeting
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['meeting'] } },
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Get many meeting recaps',
						description: 'Get recorded meetings that have a finished recap, newest first',
						routing: { request: { method: 'GET', url: '/meetings' } },
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 100 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: { show: { resource: ['meeting'], operation: ['getAll'] } },
				routing: { send: { type: 'query', property: 'limit' } },
			},

			// To-do
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['todo'] } },
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create a to do',
						description: 'Add a to-do to the SayBriefly To-Do list',
						routing: { request: { method: 'POST', url: '/todos' } },
					},
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Get many to dos',
						description: 'Get to-dos from the SayBriefly To-Do list, newest first',
						routing: { request: { method: 'GET', url: '/todos' } },
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				required: true,
				default: '',
				description: 'What needs doing',
				displayOptions: { show: { resource: ['todo'], operation: ['create'] } },
				routing: { send: { type: 'body', property: 'title' } },
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { resource: ['todo'], operation: ['create'] } },
				options: [
					{
						displayName: 'Due Date',
						name: 'due_date',
						type: 'string',
						default: '',
						placeholder: '2026-10-31',
						description: 'Due date in YYYY-MM-DD format',
						routing: { send: { type: 'body', property: 'due_date' } },
					},
					{
						displayName: 'Notes',
						name: 'notes',
						type: 'string',
						typeOptions: { rows: 3 },
						default: '',
						routing: { send: { type: 'body', property: 'notes' } },
					},
					{
						displayName: 'Priority',
						name: 'priority',
						type: 'options',
						options: [
							{ name: 'Low', value: 'low' },
							{ name: 'Medium', value: 'medium' },
							{ name: 'High', value: 'high' },
							{ name: 'Urgent', value: 'urgent' },
						],
						default: 'medium',
						routing: { send: { type: 'body', property: 'priority' } },
					},
					{
						displayName: 'Project Name',
						name: 'project',
						type: 'string',
						default: '',
						routing: { send: { type: 'body', property: 'project' } },
					},
				],
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Open', value: 'open' },
					{ name: 'Done', value: 'done' },
				],
				default: 'all',
				displayOptions: { show: { resource: ['todo'], operation: ['getAll'] } },
				routing: { send: { type: 'query', property: 'status' } },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 100 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: { show: { resource: ['todo'], operation: ['getAll'] } },
				routing: { send: { type: 'query', property: 'limit' } },
			},
		],
	};
}
