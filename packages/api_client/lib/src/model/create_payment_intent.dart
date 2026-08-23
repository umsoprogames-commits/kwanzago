//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_payment_intent.g.dart';

/// CreatePaymentIntent
///
/// Properties:
/// * [paymentAlias]
/// * [quantity]
/// * [fareRuleId]
@BuiltValue()
abstract class CreatePaymentIntent
    implements Built<CreatePaymentIntent, CreatePaymentIntentBuilder> {
  @BuiltValueField(wireName: r'paymentAlias')
  String get paymentAlias;

  @BuiltValueField(wireName: r'quantity')
  int get quantity;

  @BuiltValueField(wireName: r'fareRuleId')
  String get fareRuleId;

  CreatePaymentIntent._();

  factory CreatePaymentIntent([void updates(CreatePaymentIntentBuilder b)]) =
      _$CreatePaymentIntent;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreatePaymentIntentBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreatePaymentIntent> get serializer =>
      _$CreatePaymentIntentSerializer();
}

class _$CreatePaymentIntentSerializer
    implements PrimitiveSerializer<CreatePaymentIntent> {
  @override
  final Iterable<Type> types = const [
    CreatePaymentIntent,
    _$CreatePaymentIntent
  ];

  @override
  final String wireName = r'CreatePaymentIntent';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreatePaymentIntent object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'paymentAlias';
    yield serializers.serialize(
      object.paymentAlias,
      specifiedType: const FullType(String),
    );
    yield r'quantity';
    yield serializers.serialize(
      object.quantity,
      specifiedType: const FullType(int),
    );
    yield r'fareRuleId';
    yield serializers.serialize(
      object.fareRuleId,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreatePaymentIntent object, {
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
    required CreatePaymentIntentBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'paymentAlias':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.paymentAlias = valueDes;
          break;
        case r'quantity':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.quantity = valueDes;
          break;
        case r'fareRuleId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.fareRuleId = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreatePaymentIntent deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreatePaymentIntentBuilder();
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
