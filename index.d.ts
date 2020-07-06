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
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector>
  }

  interface GuildTextable {
    awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector>
  }
}

declare type PlurisPlugins = { [plugin: string]: boolean };

declare function Pluris(Eris: typeof import('eris'), options?: PlurisPlugins): void;

export = Pluris;
