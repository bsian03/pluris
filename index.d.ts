import { EventEmitter } from 'events';

declare module 'eris' {
  interface CollectorOptions {
    timeout?: number;
    count?: number;
  }

  interface MessageCollectorOptions extends CollectorOptions {
    filter?: (msg: Message) => boolean;
  }

  interface ReactionCollectorOptions extends CollectorOptions {
    filter?: (userID: string) => boolean;
  }

  interface CollectedReaction<T extends PossiblyUncachedTextable> {
    msg: Message<T>;
    emoji: Emoji;
    userID: string;
  }

  class MessageCollector<T extends TextableChannel> extends EventEmitter implements MessageCollectorOptions {
    channel: T;
    timeout: number;
    count: number;
    filter: (msg: Message) => boolean;
    collected: Collection<Message<T>>;
    running: boolean;
    constructor(channel: T, options?: MessageCollectorOptions);
    run(): Promise<MessageCollector<T>>;
    stop(): void;
    on(listener: 'collect' | 'update' | 'delete', event: (msg: Message) => void): this;
    on(listener: 'stop', event: () => void): this;
  }

  class ReactionCollector<T extends PossiblyUncachedTextable> extends EventEmitter implements ReactionCollectorOptions {
    message: Message<T>;
    timeout: number;
    count: number;
    filter: (userID: string) => boolean;
    collected: CollectedReaction<T>[];
    running: boolean;
    run(): Promise<ReactionCollector<T>>;
    stop(): void;
    on(listener: 'collect', event: (x: CollectedReaction<T>) => void): this;
  }

  class RichEmbed implements EmbedOptions {
    fields: EmbedField[];
    setTitle(title: string): this;
    setDescription(description: string): this;
    setURL(url: string): this;
    setTimestamp(timestamp?: number | string | Date): this;
    setColor(color: string|number): this;
    setFooter(text: string, iconURL?: string): this;
    setImage(imageURL: string): this;
    setThumbnail(thumbnailURL: string): this;
    setAuthor(name: string, url?: string, iconURL?: string): this;
    addField(name: string, value: string, inline?: boolean): this;
  }

  class DiscordWebhook extends Base {
    client: Client;
    type: 1 | 2;
    channel: GuildTextableChannel;
    name: string | null;
    avatar: string | null;
    avatarURL: string;
    guild?: Guild | { id: string };
    user?: User;
    token?: string;
    defaultAvatarURL: string;
    constructor(data: BaseData, client: Client);
    update(data: BaseData): void;
    delete(token?: boolean): Promise<void>;
    edit(options: { avatar?: string; channelID?: string; name?: string }, token?: boolean, reason?: string): Promise<this>; // WebhookOptions
    execute(options: WebhookPayload): Promise<void>;
    execute(options: WebhookPayload & {wait: true}): Promise<Message<GuildTextableChannel>>;
    executeSlack(options: Record<string, unknown> & { auth?: boolean }): Promise<void>;
    executeSlack(options: Record<string, unknown> & { auth?: boolean; wait: true }): Promise<Message<GuildTextableChannel>>;
  }

  interface Textable {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<TextableChannel>>;
    createMessage(content: MessageContent | { embed?: RichEmbed }, file?: MessageFile | MessageFile[]): Promise<Message>;
  }

  interface GuildTextable {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<GuildTextableChannel>>;
    createMessage(content: MessageContent | { embed?: RichEmbed }, file?: MessageFile | MessageFile[]): Promise<Message<GuildTextableChannel>>;
  }

  interface TextChannel {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<TextChannel>>;
    createMessage(content: MessageContent | { embed?: RichEmbed }, file?: MessageFile | MessageFile[]): Promise<Message<TextChannel>>;
    syncWebhooks(): Promise<void>;
    webhooks: Collection<DiscordWebhook>;
  }

  interface NewsChannel {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<NewsChannel>>;
    createMessage(content: MessageContent | { embed?: RichEmbed }, file?: MessageFile | MessageFile[]): Promise<Message<NewsChannel>>;
  }

  interface PrivateChannel {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<PrivateChannel>>;
    createMessage(content: MessageContent | { embed?: RichEmbed }, file?: MessageFile | MessageFile[]): Promise<Message<PrivateChannel>>;
  }

  interface Message<T extends PossiblyUncachedTextable = TextableChannel> {
    awaitReactions(options: ReactionCollectorOptions): Promise<ReactionCollector<T>>;
    guild: T extends GuildTextable ? Guild : undefined;
    webhook: DiscordWebhook | { id: string };
  }

  interface User {
    createMessage(content: MessageContent | { embed?: RichEmbed }, file?: MessageFile | MessageFile[]): Promise<Message<PrivateChannel>>;
  }

  interface Client {
    awaitChannelMessages(channel: TextableChannel, options: MessageCollectorOptions): Promise<MessageCollector<TextableChannel>>;
    awaitMessageReactions(message: Message, options: ReactionCollectorOptions): Promise<ReactionCollector<TextableChannel>>;
    createMessage(channelID: string, content: MessageContent | { embed?: RichEmbed }, file?: MessageFile | MessageFile[]): Promise<Message>;
    createDMMessage(userID: string, content: MessageContent | { embed?: RichEmbed }, file?: MessageFile | MessageFile[]): Promise<Message<PrivateChannel>>;
    syncChannelWebhooks(channelID: string): Promise<void>;
    syncGuildWebhooks(guildID: string): Promise<void>;
  }

  interface Guild {
    syncWebhooks(): Promise<void>;
    webhooks: Collection<DiscordWebhook>;
  }

  interface Member {
    roleList: Collection<Role>;
  }

  interface Endpoints {
    BASE_URL: `/api/v${number}`;
    CDN_URL: 'https://cdn.discordapp.com';
    CLIENT_URL: 'https://discord.com';

    CHANNEL(chanID: string): `/channels/${string}`;
    CHANNEL_BULK_DELETE(chanID: string): `/channels/${string}/messages/bulk-delete`;
    CHANNEL_CALL_RING(chanID: string): `/channels/${string}/call/ring`;
    CHANNEL_CROSSPOST(chanID: string, msgID: string): `/channels/${string}/messages/${string}/crosspost`;
    CHANNEL_FOLLOW(chanID: string): `/channels/${string}/followers`;
    CHANNEL_INVITES(chanID: string): `/channels/${string}/invites`;
    CHANNEL_MESSAGE_REACTION(chanID: string, msgID: string, reaction: string): `/channels/${string}/messages/${string}/reactions/${string}`;
    CHANNEL_MESSAGE_REACTION_USER(chanID: string, msgID: string, reaction: string, userID: string): `/channels/${string}/messages/${string}/reactions/${string}/${string}`;
    CHANNEL_MESSAGE_REACTIONS(chanID: string, msgID: string): `/channels/${string}/messages/${string}/reactions`;
    CHANNEL_MESSAGE(chanID: string, msgID: string): `/channels/${string}/messages/${string}`;
    CHANNEL_MESSAGES(chanID: string): `/channels/${string}/messages`;
    CHANNEL_MESSAGES_SEARCH(chanID: string): `/channels/${string}/messages/search`;
    CHANNEL_PERMISSION(chanID: string, overID: string): `/channels/${string}/permissions/${string}`;
    CHANNEL_PERMISSIONS(chanID: string): `/channels/${string}/permissions`;
    CHANNEL_PIN(chanID: string, msgID: string): `/channels/${string}/pins/${string}`;
    CHANNEL_PINS(chanID: string): `/channels/${string}/pins`;
    CHANNEL_RECIPIENT(groupID: string, userID: string): `/channels/${string}/recipients/${string}`;
    CHANNEL_TYPING(chanID: string): `/channels/${string}/typing`;
    CHANNEL_WEBHOOKS(chanID: string): `/channels/${string}/webhooks`;
    CHANNELS: '/channels';
    CUSTOM_EMOJI_GUILD(emojiID: string): `/emojis/${string}/guild`;
    DISCOVERY_CATEGORIES: '/discovery/categories';
    DISCOVERY_VALIDATION: '/discovery/valid-term';
    GATEWAY: '/gateway';
    GATEWAY_BOT: '/gateway/bot';
    GUILD(guildID: string): `/guilds/${string}`;
    GUILD_AUDIT_LOGS(guildID: string): `/guilds/${string}/audit-logs`;
    GUILD_BAN(guildID: string, memberID: string): `/guilds/${string}/bans/${string}`;
    GUILD_BANS(guildID: string): `/guilds/${string}/bans`;
    GUILD_CHANNELS(guildID: string): `/guilds/${string}/channels`;
    GUILD_DISCOVERY(guildID: string): `/guilds/${string}/discovery-metadata`;
    GUILD_DISCOVERY_CATEGORY(guildID: string, categoryID: string): `/guilds/${string}/discovery-categories/${string}`;
    GUILD_EMBED(guildID: string): `/guilds/${string}/embed`;
    GUILD_EMOJI(guildID: string, emojiID: string): `/guilds/${string}/emojis/${string}`;
    GUILD_EMOJIS(guildID: string): `/guilds/${string}/emojis`;
    GUILD_INTEGRATION(guildID: string, inteID: string): `/guilds/${string}/integrations/${string}`;
    GUILD_INTEGRATION_SYNC(guildID: string, inteID: string): `/guilds/${string}/integrations/${string}/sync`;
    GUILD_INTEGRATIONS(guildID: string): `/guilds/${string}/integrations`;
    GUILD_INVITES(guildID: string): `/guilds/${string}/invites`;
    GUILD_VANITY_URL(guildID: string): `/guilds/${string}/vanity-url`;
    GUILD_MEMBER(guildID: string, memberID: string): `/guilds/${string}/members/${string}`;
    GUILD_MEMBER_NICK(guildID: string, memberID: string): `/guilds/${string}/members/${string}/nick`;
    GUILD_MEMBER_ROLE(guildID: string, memberID: string, roleID: string): `/guilds/${string}/members/${string}/roles/${string}`;
    GUILD_MEMBERS(guildID: string): `/guilds/${string}/members`;
    GUILD_MEMBERS_SEARCH(guildID: string): `/guilds/${string}/members/search`;
    GUILD_MESSAGES_SEARCH(guildID: string): `/guilds/${string}/messages/search`;
    GUILD_PREVIEW(guildID: string): `/guilds/${string}/preview`;
    GUILD_PRUNE(guildID: string): `/guilds/${string}/prune`;
    GUILD_ROLE(guildID: string, roleID: string): `/guilds/${string}/roles/${string}`;
    GUILD_ROLES(guildID: string): `/guilds/${string}/roles`;
    GUILD_TEMPLATE(code: string): `/guilds/template/${string}`;
    GUILD_TEMPLATES(guildID: string): `/guilds/${string}/templates`;
    GUILD_TEMPLATE_GUILD(guildID: string, code: string): `/guilds/${string}/templates/${string}`;
    GUILD_VOICE_REGIONS(guildID: string): `/guilds/${string}/regions`;
    GUILD_WEBHOOKS(guildID: string): `/guilds/${string}/webhooks`;
    GUILD_WIDGET(guildID: string): `/guilds/${string}/widget`;
    GUILD_VOICE_STATE(guildID: string, user: string): `/guilds/${string}/voice-states/${string}`
    GUILDS: '/guilds';
    INVITE(inviteID: string): `/invite/${string}`;
    OAUTH2_APPLICATION(appID: string): `/oauth2/applications/${string}`;
    USER(userID: string): `/users/${string}`;
    USER_BILLING(userID: string): `/users/${string}/billing`;
    USER_BILLING_PAYMENTS(userID: string): `/users/${string}/billing/payments`;
    USER_BILLING_PREMIUM_SUBSCRIPTION(userID: string): `/users/${string}/billing/premium-subscription`;
    USER_CHANNELS(userID: string): `/users/${string}/channels`;
    USER_CONNECTIONS(userID: string): `/users/${string}/connections`;
    USER_CONNECTION_PLATFORM(userID: string, platform: string, id: string): `/users/${string}/connections/${string}/${string}`;
    USER_GUILD(userID: string, guildID: string): `/users/${string}/guilds/${string}`;
    USER_GUILDS(userID: string): `/users/${string}/guilds`;
    USER_MFA_CODES(userID: string): `/users/${string}/mfa/codes`;
    USER_MFA_TOTP_DISABLE(userID: string): `/users/${string}/mfa/totp/disable`;
    USER_MFA_TOTP_ENABLE(userID: string): `/users/${string}/mfa/totp/enable`;
    USER_NOTE(userID: string, targetID: string): `/users/${string}/note/${string}`;
    USER_PROFILE(userID: string): `/users/${string}/profile`;
    USER_RELATIONSHIP(userID: string, relID: string): `/users/${string}/relationships/${string}`;
    USER_SETTINGS(userID: string): `/users/${string}/settings`;
    USERS: '/users';
    VOICE_REGIONS: '/voice/regions';
    WEBHOOK(hookID: string): `/webhooks/${string}`;
    WEBHOOK_MESSAGE(hookID: string, token: string, msgID: string): `/webhooks/${string}/${string}/messages/${string}`;
    WEBHOOK_SLACK(hookID: string): `/webhooks/${string}/slack`;
    WEBHOOK_TOKEN(hookID: string, token: string): `/webhooks/${string}/${string}`;
    WEBHOOK_TOKEN_SLACK(hookID: string, token: string): `/webhooks/${string}/${string}/slack`;

    // CDN Endpoints
    ACHIEVEMENT_ICON(applicationID: string, achievementID: string, icon: string): `/app-assets/${string}/achievements/${string}/icons/${string}`;
    APPLICATION_ASSET(applicationID: string, asset: string): `/app-assets/${string}/${string}`;
    APPLICATION_ICON(applicationID: string, icon: string): `/app-icons/${string}/${string}`;
    CHANNEL_ICON(chanID: string, chanIcon: string): `/channel-icons/${string}/${string}`;
    CUSTOM_EMOJI(emojiID: string): `/emojis/${string}`;
    DEFAULT_USER_AVATAR(userDiscriminator: string): `/embed/avatars/${string}`;
    GUILD_BANNER(guildID: string, guildBanner: string): `/banners/${string}/${string}`;
    GUILD_DISCOVERY_SPLASH(guildID: string, guildDiscoverySplash: string): `/discovery-splashes/${string}/${string}`;
    GUILD_ICON(guildID: string, guildIcon: string): `/icons/${string}/${string}`;
    GUILD_SPLASH(guildID: string, guildSplash: string): `/splashes/${string}/${string}`;
    TEAM_ICON(teamID: string, teamIcon: string): `/team-icons/${string}/${string}`;
    USER_AVATAR(userID: string, userAvatar: string): `/avatars/${string}/${string}`;

    // Client Endpoints
    MESSAGE_LINK(guildID: string, channelID: string, messageID: string): `/channels/${string}/${string}/${string}`;
  }

  const Endpoints: Endpoints;
}

declare type PlurisPlugins = { [plugin: string]: boolean };

declare function Pluris(Eris: typeof import('eris'), options?: PlurisPlugins): void;

export = Pluris;
