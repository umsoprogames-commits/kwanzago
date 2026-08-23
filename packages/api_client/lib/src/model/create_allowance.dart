//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_allowance.g.dart';

/// CreateAllowance
///
/// Properties:
/// * [collectorId]
/// * [amountMinor]
@BuiltValue()
abstract class CreateAllowance
    implements Built<CreateAllowance, CreateAllowanceBuilder> {
  @BuiltValueField(wireName: r'collectorId')
  String get collectorId;

  @BuiltValueField(wireName: r'amountMinor')
  int get amountMinor;

  CreateAllowance._();

  factory CreateAllowance([void updates(CreateAllowanceBuilder b)]) =
      _$CreateAllowance;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateAllowanceBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateAllowance> get serializer =>
      _$CreateAllowanceSerializer();
}

class _$CreateAllowanceSerializer
    implements PrimitiveSerializer<CreateAllowance> {
  @override
  final Iterable<Type> types = const [CreateAllowance, _$CreateAllowance];

  @override
  final String wireName = r'CreateAllowance';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateAllowance object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'collectorId';
    yield serializers.serialize(
      object.collectorId,
      specifiedType: const FullType(String),
    );
    yield r'amountMinor';
    yield serializers.serialize(
      object.amountMinor,
      specifiedType: const FullType(int),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateAllowance object, {
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
    required CreateAllowanceBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'collectorId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.collectorId = valueDes;
          break;
        case r'amountMinor':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.amountMinor = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateAllowance deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateAllowanceBuilder();
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
