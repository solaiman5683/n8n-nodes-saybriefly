import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SayBrieflyApi implements ICredentialType {
	name = 'sayBrieflyApi';

	displayName = 'SayBriefly API';

	icon: Icon = { light: 'file:../icons/saybriefly.svg', dark: 'file:../icons/saybriefly.dark.svg' };

	documentationUrl = 'https://github.com/solaiman5683/saybriefly-mcp/blob/main/API.md';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Your personal SayBriefly key (starts with sbk_). Create it in SayBriefly: Settings, Integrations, Connect your AI.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://public-api.saybriefly.com/v1',
			url: '/me',
			method: 'GET',
		},
	};
}
