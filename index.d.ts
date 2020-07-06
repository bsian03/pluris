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

  class Embed implements EmbedOptions {
    fields: EmbedField[];
    setTitle(title: string): this;
    setDescription(description: string): this;
    setURL(url: string): this;
    setTimestamp(timestamp?: DateConstructor): this;
    setColor(color: string|number): this;
    setFooter(text: string, iconURL?: string): this;
    setImage(imageURL: string): this;
    setThumbnail(thumbnailURL: string): this;
    setAuthor(name: string, url?: string, iconURL?: string): this;
    addField(name: string, value: string, inline?: boolean): this;
  }

  interface Textable {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector>;
    createMessage(content: MessageContent | { embed?: Embed }, file?: MessageFile | MessageFile[]): Promise<Message>;
  }

  interface GuildTextable {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<GuildTextableChannel>>;
    createMessage(content: MessageContent | { embed?: Embed }, file?: MessageFile | MessageFile[]): Promise<Message<GuildTextableChannel>>;
  }

  interface TextChannel {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<TextChannel>>;
    createMessage(content: MessageContent | { embed?: Embed }, file?: MessageFile | MessageFile[]): Promise<Message<TextChannel>>;
  }

  interface NewsChannel {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<NewsChannel>>;
    createMessage(content: MessageContent | { embed?: Embed }, file?: MessageFile | MessageFile[]): Promise<Message<NewsChannel>>;
  }

  interface PrivateChannel {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<PrivateChannel>>;
    createMessage(content: MessageContent | { embed?: Embed }, file?: MessageFile | MessageFile[]): Promise<Message<PrivateChannel>>;
  }

  interface Message<T extends Textable = TextableChannel> {
    awaitReactions(options: ReactionCollectorOptions): Promise<ReactionCollector<T>>;
  }

  interface User {
    createMessage(content: MessageContent | { embed?: Embed }, file?: MessageFile | MessageFile[]): Promise<Message<PrivateChannel>>;
  }

  interface Client {
    awaitChannelMessages(channel: TextableChannel, options: MessageCollectorOptions): Promise<MessageCollector>;
    awaitMessageReactions(message: Message, options: ReactionCollectorOptions): Promise<ReactionCollector>;
    createMessage(channelID: string, content: MessageContent | { embed?: Embed }, file?: MessageFile | MessageFile[]): Promise<Message>;
    createDMMessage(userID: string, content: MessageContent | { embed?: Embed }, file?: MessageFile | MessageFile[]): Promise<Message<PrivateChannel>>;
  }
}

declare type PlurisPlugins = { [plugin: string]: boolean };

declare function Pluris(Eris: typeof import('eris'), options?: PlurisPlugins): void;

export = Pluris;
