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

  interface CollectedReaction<T extends Textable = TextableChannel> {
    msg: Message<T>;
    emoji: Emoji;
    userID: string;
  }

  class MessageCollector<T extends Textable = TextableChannel> extends EventEmitter implements MessageCollectorOptions {
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

  class ReactionCollector<T extends Textable = TextableChannel> extends EventEmitter implements ReactionCollectorOptions {
    message: Message<T>;
    timeout: number;
    count: number;
    filter: (userID: string) => boolean;
    collected: CollectedReaction<T>[];
    running: boolean;
    run(): Promise<ReactionCollector<T>>;
    stop(): void;
    on(listener: 'collect', event: (x: CollectedReaction) => void): this;
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

  /**
   * @deprecated Use Eris.RichEmbed instead
   */
  export class Embed extends RichEmbed {}

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
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector>;
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

  interface Message<T extends Textable = TextableChannel> {
    awaitReactions(options: ReactionCollectorOptions): Promise<ReactionCollector<T>>;
    guild: T extends GuildTextable ? Guild : undefined;
    webhook: DiscordWebhook | { id: string };
  }

  interface User {
    createMessage(content: MessageContent | { embed?: RichEmbed }, file?: MessageFile | MessageFile[]): Promise<Message<PrivateChannel>>;
  }

  interface Client {
    awaitChannelMessages(channel: TextableChannel, options: MessageCollectorOptions): Promise<MessageCollector>;
    awaitMessageReactions(message: Message, options: ReactionCollectorOptions): Promise<ReactionCollector>;
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
    BASE_URL: '/api/v7';
    CDN_URL: 'https://cdn.discordapp.com';
    CHANNEL(chanID: string): string;
    CHANNEL_BULK_DELETE(chanID: string): string;
    CHANNEL_CALL_RING(chanID: string): string;
    CHANNEL_CROSSPOST(chanID: string, msgID: string): string;
    CHANNEL_FOLLOW(chanID: string): string;
    CHANNEL_INVITES(chanID: string): string;
    CHANNEL_MESSAGE_REACTION(chanID: string, msgID: string, reaction: string): string;
    CHANNEL_MESSAGE_REACTION_USER(chanID: string, msgID: string, reaction: string, userID: string): string;
    CHANNEL_MESSAGE_REACTIONS(chanID: string, msgID: string): string;
    CHANNEL_MESSAGE(chanID: string, msgID: string): string;
    CHANNEL_MESSAGES(chanID: string): string;
    CHANNEL_MESSAGES_SEARCH(chanID: string): string;
    CHANNEL_PERMISSION(chanID: string, overID: string): string;
    CHANNEL_PERMISSIONS(chanID: string): string;
    CHANNEL_PIN(chanID: string, msgID: string): string;
    CHANNEL_PINS(chanID: string): string;
    CHANNEL_RECIPIENT(groupID: string, userID: string): string;
    CHANNEL_TYPING(chanID: string): string;
    CHANNEL_WEBHOOKS(chanID: string): string;
    CHANNELS: '/channels';
    GATEWAY: '/gateway';
    GATEWAY_BOT: '/gateway/bot';
    GUILD(guildID: string): string;
    GUILD_AUDIT_LOGS(guildID: string): string;
    GUILD_BAN(guildID: string, memberID: string): string;
    GUILD_BANS(guildID: string): string;
    GUILD_CHANNELS(guildID: string): string;
    GUILD_EMBED(guildID: string): string;
    GUILD_EMOJI(guildID: string, emojiID: string): string;
    GUILD_EMOJIS(guildID: string): string;
    GUILD_INTEGRATION(guildID: string, inteID: string): string;
    GUILD_INTEGRATION_SYNC(guildID: string, inteID: string): string;
    GUILD_INTEGRATIONS(guildID: string): string;
    GUILD_INVITES(guildID: string): string;
    GUILD_VANITY_URL(guildID: string): string;
    GUILD_MEMBER(guildID: string, memberID: string): string;
    GUILD_MEMBER_NICK(guildID: string, memberID: string): string;
    GUILD_MEMBER_ROLE(guildID: string, memberID: string, roleID: string): string;
    GUILD_MEMBERS(guildID: string): string;
    GUILD_MEMBERS_SEARCH(guildID: string): string;
    GUILD_MESSAGES_SEARCH(guildID: string): string;
    GUILD_PREVIEW(guildID: string): string;
    GUILD_PRUNE(guildID: string): string;
    GUILD_ROLE(guildID: string, roleID: string): string;
    GUILD_ROLES(guildID: string): string;
    GUILD_VOICE_REGIONS(guildID: string): string;
    GUILD_WEBHOOKS(guildID: string): string;
    GUILD_WIDGET(guildID: string): string;
    GUILDS: '/guilds';
    INVITE(inviteID: string): string;
    OAUTH2_APPLICATION(appID: string): string;
    USER(userID: string): string;
    USER_BILLING(userID: string): string;
    USER_BILLING_PAYMENTS(userID: string): string;
    USER_BILLING_PREMIUM_SUBSCRIPTION(userID: string): string;
    USER_CHANNELS(userID: string): string;
    USER_CONNECTIONS(userID: string): string;
    USER_CONNECTION_PLATFORM(userID: string, platform: string, id: string): string;
    USER_GUILD(userID: string, guildID: string): string;
    USER_GUILDS(userID: string): string;
    USER_MFA_CODES(userID: string): string;
    USER_MFA_TOTP_DISABLE(userID: string): string;
    USER_MFA_TOTP_ENABLE(userID: string): string;
    USER_NOTE(userID: string, targetID: string): string;
    USER_PROFILE(userID: string): string;
    USER_RELATIONSHIP(userID: string, relID: string): string;
    USER_SETTINGS(userID: string): string;
    USERS: '/users';
    VOICE_REGIONS: '/voice/regions';
    WEBHOOK(hookID: string): string;
    WEBHOOK_SLACK(hookID: string): string;
    WEBHOOK_TOKEN(hookID: string, token: string): string;
    WEBHOOK_TOKEN_SLACK(hookID: string, token: string): string;

    // CDN Endpoints
    CHANNEL_ICON(chanID: string, chanIcon: string): string;
    CUSTOM_EMOJI(emojiID: string): string;
    DEFAULT_USER_AVATAR(userDiscriminator: string): string;
    GUILD_BANNER(guildID: string, guildBanner: string): string;
    GUILD_ICON(guildID: string, guildIcon: string): string;
    GUILD_SPLASH(guildID: string, guildSplash: string): string;
    USER_AVATAR(userID: string, userAvatar: string): string;
  }

  const Endpoints: Endpoints;
}

declare type PlurisPlugins = { [plugin: string]: boolean };

declare function Pluris(Eris: typeof import('eris'), options?: PlurisPlugins): void;

export = Pluris;
