//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payment_alias.g.dart';

/// PaymentAlias
///
/// Properties:
/// * [id]
/// * [qrPayload] - Public alias only; never balance or PII
/// * [state]
@BuiltValue()
abstract class PaymentAlias
    implements Built<PaymentAlias, PaymentAliasBuilder> {
  @BuiltValueField(wireName: r'id')
  String get id;

  /// Public alias only; never balance or PII
  @BuiltValueField(wireName: r'qrPayload')
  String get qrPayload;

  @BuiltValueField(wireName: r'state')
  PaymentAliasStateEnum get state;
  // enum stateEnum {  ACTIVE,  BLOCKED,  REPLACED,  };

  PaymentAlias._();

  factory PaymentAlias([void updates(PaymentAliasBuilder b)]) = _$PaymentAlias;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentAliasBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentAlias> get serializer => _$PaymentAliasSerializer();
}

class _$PaymentAliasSerializer implements PrimitiveSerializer<PaymentAlias> {
  @override
  final Iterable<Type> types = const [PaymentAlias, _$PaymentAlias];

  @override
  final String wireName = r'PaymentAlias';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentAlias object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'qrPayload';
    yield serializers.serialize(
      object.qrPayload,
      specifiedType: const FullType(String),
    );
    yield r'state';
    yield serializers.serialize(
      object.state,
      specifiedType: const FullType(PaymentAliasStateEnum),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentAlias object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object,
            specifiedType: specifiedType)
        .toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required PaymentAliasBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'qrPayload':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.qrPayload = valueDes;
          break;
        case r'state':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(PaymentAliasStateEnum),
          ) as PaymentAliasStateEnum;
          result.state = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentAlias deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentAliasBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class PaymentAliasStateEnum extends EnumClass {
  @BuiltValueEnumConst(wireName: r'ACTIVE')
  static const PaymentAliasStateEnum ACTIVE = _$paymentAliasStateEnum_ACTIVE;
  @BuiltValueEnumConst(wireName: r'BLOCKED')
  static const PaymentAliasStateEnum BLOCKED = _$paymentAliasStateEnum_BLOCKED;
  @BuiltValueEnumConst(wireName: r'REPLACED')
  static const PaymentAliasStateEnum REPLACED =
      _$paymentAliasStateEnum_REPLACED;
  @BuiltValueEnumConst(wireName: r'unknown_default_open_api', fallback: true)
  static const PaymentAliasStateEnum unknownDefaultOpenApi =
      _$paymentAliasStateEnum_unknownDefaultOpenApi;

  static Serializer<PaymentAliasStateEnum> get serializer =>
      _$paymentAliasStateEnumSerializer;

  const PaymentAliasStateEnum._(String name) : super(name);

  static BuiltSet<PaymentAliasStateEnum> get values =>
      _$paymentAliasStateEnumValues;
  static PaymentAliasStateEnum valueOf(String name) =>
      _$paymentAliasStateEnumValueOf(name);
}
