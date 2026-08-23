//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/json_object.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payment_intent.g.dart';

/// PaymentIntent
///
/// Properties:
/// * [id]
/// * [state]
/// * [quantity]
/// * [unitAmountMinor]
/// * [totalAmountMinor]
/// * [expiresAt]
/// * [stepUpRequired]
/// * [collector]
@BuiltValue()
abstract class PaymentIntent
    implements Built<PaymentIntent, PaymentIntentBuilder> {
  @BuiltValueField(wireName: r'id')
  String get id;

  @BuiltValueField(wireName: r'state')
  PaymentIntentStateEnum get state;
  // enum stateEnum {  PENDING_CONFIRMATION,  APPROVED,  DECLINED,  EXPIRED,  CANCELLED,  UNKNOWN,  };

  @BuiltValueField(wireName: r'quantity')
  int get quantity;

  @BuiltValueField(wireName: r'unitAmountMinor')
  int get unitAmountMinor;

  @BuiltValueField(wireName: r'totalAmountMinor')
  int get totalAmountMinor;

  @BuiltValueField(wireName: r'expiresAt')
  DateTime get expiresAt;

  @BuiltValueField(wireName: r'stepUpRequired')
  bool get stepUpRequired;

  @BuiltValueField(wireName: r'collector')
  BuiltMap<String, JsonObject?>? get collector;

  PaymentIntent._();

  factory PaymentIntent([void updates(PaymentIntentBuilder b)]) =
      _$PaymentIntent;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentIntentBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentIntent> get serializer =>
      _$PaymentIntentSerializer();
}

class _$PaymentIntentSerializer implements PrimitiveSerializer<PaymentIntent> {
  @override
  final Iterable<Type> types = const [PaymentIntent, _$PaymentIntent];

  @override
  final String wireName = r'PaymentIntent';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentIntent object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'state';
    yield serializers.serialize(
      object.state,
      specifiedType: const FullType(PaymentIntentStateEnum),
    );
    yield r'quantity';
    yield serializers.serialize(
      object.quantity,
      specifiedType: const FullType(int),
    );
    yield r'unitAmountMinor';
    yield serializers.serialize(
      object.unitAmountMinor,
      specifiedType: const FullType(int),
    );
    yield r'totalAmountMinor';
    yield serializers.serialize(
      object.totalAmountMinor,
      specifiedType: const FullType(int),
    );
    yield r'expiresAt';
    yield serializers.serialize(
      object.expiresAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'stepUpRequired';
    yield serializers.serialize(
      object.stepUpRequired,
      specifiedType: const FullType(bool),
    );
    if (object.collector != null) {
      yield r'collector';
      yield serializers.serialize(
        object.collector,
        specifiedType: const FullType(
            BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentIntent object, {
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
    required PaymentIntentBuilder result,
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
        case r'state':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(PaymentIntentStateEnum),
          ) as PaymentIntentStateEnum;
          result.state = valueDes;
          break;
        case r'quantity':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.quantity = valueDes;
          break;
        case r'unitAmountMinor':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.unitAmountMinor = valueDes;
          break;
        case r'totalAmountMinor':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.totalAmountMinor = valueDes;
          break;
        case r'expiresAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.expiresAt = valueDes;
          break;
        case r'stepUpRequired':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.stepUpRequired = valueDes;
          break;
        case r'collector':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(
                BuiltMap, [FullType(String), FullType.nullable(JsonObject)]),
          ) as BuiltMap<String, JsonObject?>?;
          if (valueDes == null) continue;
          result.collector.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentIntent deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentIntentBuilder();
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

class PaymentIntentStateEnum extends EnumClass {
  @BuiltValueEnumConst(wireName: r'PENDING_CONFIRMATION')
  static const PaymentIntentStateEnum PENDING_CONFIRMATION =
      _$paymentIntentStateEnum_PENDING_CONFIRMATION;
  @BuiltValueEnumConst(wireName: r'APPROVED')
  static const PaymentIntentStateEnum APPROVED =
      _$paymentIntentStateEnum_APPROVED;
  @BuiltValueEnumConst(wireName: r'DECLINED')
  static const PaymentIntentStateEnum DECLINED =
      _$paymentIntentStateEnum_DECLINED;
  @BuiltValueEnumConst(wireName: r'EXPIRED')
  static const PaymentIntentStateEnum EXPIRED =
      _$paymentIntentStateEnum_EXPIRED;
  @BuiltValueEnumConst(wireName: r'CANCELLED')
  static const PaymentIntentStateEnum CANCELLED =
      _$paymentIntentStateEnum_CANCELLED;
  @BuiltValueEnumConst(wireName: r'UNKNOWN')
  static const PaymentIntentStateEnum UNKNOWN =
      _$paymentIntentStateEnum_UNKNOWN;
  @BuiltValueEnumConst(wireName: r'unknown_default_open_api', fallback: true)
  static const PaymentIntentStateEnum unknownDefaultOpenApi =
      _$paymentIntentStateEnum_unknownDefaultOpenApi;

  static Serializer<PaymentIntentStateEnum> get serializer =>
      _$paymentIntentStateEnumSerializer;

  const PaymentIntentStateEnum._(String name) : super(name);

  static BuiltSet<PaymentIntentStateEnum> get values =>
      _$paymentIntentStateEnumValues;
  static PaymentIntentStateEnum valueOf(String name) =>
      _$paymentIntentStateEnumValueOf(name);
}
