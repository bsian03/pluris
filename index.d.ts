import { EventEmitter } from 'events';
import { TextableChannel, Message as ErisMessage, Collection, GuildTextableChannel } from 'eris';

declare global {
  namespace Eris {
    interface CollectorOptions {
      timeout?: number;
      count?: number;
    }

    interface MessageCollectorOptions extends CollectorOptions {
      filter?: (msg: ErisMessage) => boolean;
    }

    interface ReactionCollectorOptions extends CollectorOptions {
      filter?: (userID: string) => boolean;
    }

    interface CollectedReaction<T extends Textable = TextableChannel> {
      msg: ErisMessage<T>;
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
      message: ErisMessage<T>;
      timeout: number;
      count: number;
      filter: (userID: string) => boolean;
      collected: CollectedReaction<T>[];
      running: boolean;
      run(): Promise<ReactionCollector<T>>;
      stop(): void;
      on(listener: 'collect', event: (x: CollectedReaction) => void): this;
    }

    class Message<T extends Textable = TextableChannel> {
      awaitReactions(options: ReactionCollectorOptions): ReactionCollector<T>;
    }

    class TextChannel {
      awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<TextChannel>>;
    }
    class PrivateChannel {
      awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<PrivateChannel>>;
    }

    interface Textable {
      awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector>
    }
    interface GuildTextable {
      awaitMessages(options: MessageCollectorOptions): Promise<MessageCollector<GuildTextableChannel>>
    }
  }

  class Client {
    awaitMessageReactions(message: ErisMessage, options: ReactionCollectorOptions): Promise<ReactionCollector>;
    awaitChannelMessages(channel: TextableChannel, options: MessageCollectorOptions): Promise<MessageCollector>;
  }
}